import { CardProvider } from "../CardProvider"

export const AboutSection1 = () => {
    return (
        <>
            <CardProvider size="md" showEdit={true} title="Channel Name" body="#general" />
            <div className="my-6">
                <CardProvider size="md" showEdit={true} title="Topic" body="Add a Topic" />
                <CardProvider size="md" showEdit={true} title="Description" body="'Effective short descriptions provide enough context for a reader to understand what the topic conveys." />
                <CardProvider size="md" title="Created By" body="Raju kadel on December 26, 2023" />
            </div>
        </>
    )
};

export const AboutSection2 = () => {
    return (
        <>
            <CardProvider size="md" title="Channel Name" body="#general" />
            <div className="my-6">
                <CardProvider size="md" title="Topic" body="Add a Topic" />
                <CardProvider size="md" title="Description" body="'Effective short descriptions provide enough context for a reader to understand what the topic conveys. A short description ought to contain keywords that help the reader identify whether the topic contains useful information.'" />
                <CardProvider size="md" title="Created By" body="Raju kadel on December 26, 2023" />
            </div>
        </>
    )
};

export const AboutSection3 = () => {
    return (
        <>
            <CardProvider size="md" title="Channel Name" body="#general" />
            <div className="my-6">
                <CardProvider size="md" title="Topic" body="Add a Topic" />
                <CardProvider size="md" title="Description" body="'Effective short descriptions provide enough context for a reader to understand what the topic conveys. A short description ought to contain keywords that help the reader identify whether the topic contains useful information.'" />
                <CardProvider size="md" title="Created By" body="Raju kadel on December 26, 2023" />
            </div>
        </>
    )
};

