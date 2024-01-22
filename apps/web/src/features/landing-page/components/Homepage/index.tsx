import { Feature } from "./Features";
// import { Hero } from "./Hero";
import { Testimonials } from "./Testimonials";

const Page = () => {

    return (
        <div className="h-full bg-gray-800">
            <Feature />
            {/* <Hero /> */}
            <Testimonials />
        </div>
    )
}

export default Page;