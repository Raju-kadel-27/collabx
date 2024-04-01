const MS_IN_MINUTE = 60 * 1000;

export class DelayedQueuesManager {
    private channel: any;
    private delayExchangeName: string;
    private delayExchangeOptions: {
        durable: boolean,
        autoDelete: boolean
    }
    private delayQueuePrefix: string;
    private delayQueueOptions: {
        durable: string;
        deadLetterExchange: string;
    }
    private delays: {}

    constructor(
        channel: any,
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
        //@ts-ignore
        this.delayQueueOptions = {
            ...delayQueueOptions,
            deadLetterExchange: '' // must be set as Default exchange
        }
        this.delays = {};
    }

    /**
     * @param {Array<number>|Set<number>} delays - set of all possible delays in minutes
     */
    async setupDelayedTopology(delays: any) {

        await this.channel
            .assertExchange(
                this.delayExchangeName,
                'headers',
                this.delayExchangeOptions)

        await Promise.all(
            [...delays].map(async (delay) => {
                if (!Number.isFinite(delay) || delay <= 0) throw Error(`Delay ${delay} is not an integer`)

                const delayInMs = delay * MS_IN_MINUTE;

                await this.channel.assertQueue(this.getName(delay), {
                    ...this.delayQueueOptions,
                    messageTtl: delayInMs
                });

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
                //@ts-ignore
                this.delays[delay] = delayInMs
            })
        )
    }

    sendWithDelay(destinationQueue: any, content: any, delay: any, options: any = {}) {
        //@ts-ignore
        if (!this.delays[delay]) throw Error(`Delay ${delay} is not configured`)
        //@ts-ignore
        if (!options.headers) options.headers = {}
        //@ts-ignore
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

    getName(delay: any) {
        return `${this.delayQueuePrefix}-${delay}`
    }


}
