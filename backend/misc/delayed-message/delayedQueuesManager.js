const MS_IN_MINUTE = 60 * 1000

class DelayedQueuesManager {
    constructor(
        channel,
        {
            delayExchangeName = 'delay-exchange',
            delayExchangeOptions = { durable: true, autoDelete: false },
            delayQueuePrefix = 'delay-queue',
            delayQueueOptions = { durable: true }
        } = {}
    ) {

        this.channel = channel
        this.delayExchangeName = delayExchangeName
        this.delayExchangeOptions = delayExchangeOptions
        this.delayQueuePrefix = delayQueuePrefix
        this.delayQueueOptions = {
            ...delayQueueOptions,
            deadLetterExchange: '' // must be set as Default exchange
        }
        this.delays = {}
    }

    /**
     * @param {Array<number>|Set<number>} delays - set of all possible delays in minutes
     */
    async setupDelayedTopology(delays) {

        await this.channel.assertExchange(this.delayExchangeName, 'headers', this.delayExchangeOptions)
        await Promise.all(
            [...delays].map(async (delay) => {
                if (!Number.isFinite(delay) || delay <= 0) throw Error(`Delay ${delay} is not an integer`)

                const delayInMs = delay * MS_IN_MINUTE
                await this.channel.assertQueue(this.getName(delay), {
                    ...this.delayQueueOptions,
                    messageTtl: delayInMs
                })
                await this
                    .channel
                    .bindQueue
                    (
                        this.getName(delay), this.delayExchangeName, '',
                        {
                            'x-match': 'all',
                            delay: delayInMs
                        }
                    )
                this.delays[delay] = delayInMs
            })
        )
    }

    sendWithDelay(destinationQueue, content, delay, options = {}) {

        if (!this.delays[delay]) throw Error(`Delay ${delay} is not configured`)

        if (!options.headers) options.headers = {}
        options.headers.delay = this.delays[delay]

        return this
            .channel
            .publish
            (
                this.delayExchangeName,
                destinationQueue,
                Buffer.from(JSON.stringify(content)), options
            )
    }

    getName(delay) {
        return `${this.delayQueuePrefix}-${delay}`
    }
}

module.exports = DelayedQueuesManager