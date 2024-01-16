import { Heading } from '@chakra-ui/react'
import { TeamAccordion } from '../Accordion/Accordion'

const YourTeams = () => {
    return (
        <div className='h-[calc(100vh-64px)] bg-white '>
            <section className='pr-6'>
                <Heading
                    paddingY={'4'}
                    paddingBottom={'12'}
                    paddingX={'6'}>Teams</Heading>
                    
                <TeamAccordion />
                <TeamAccordion />
                <TeamAccordion />
            </section>
        </div>
    )
}

export default YourTeams