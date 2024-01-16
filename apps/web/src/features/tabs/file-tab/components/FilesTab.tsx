import { Table } from "./Table";

    interface FileList {
        name: string;
        size: string;
        createdAt: string;
        modifiedBy: string;
        sharedWith: string;
        type: string;
    }

const fileList =
    [
        {
            name: 'Recordings',
            size: '234 MB',
            createdAt: 'Jan 23',
            modifiedBy: 'Shailesh Devkota',
            sharedWith: 'Prabesh Sharma',
            type: 'folder'
        },
        {
            name: 'LabSheets',
            size: '21 MB',
            createdAt: 'Sept 23',
            modifiedBy: 'Ranju Neupane',
            sharedWith: 'Dinesh Sharma',
            type: 'folder'
        },
        {
            name: 'informates',
            size: '14 kB',
            createdAt: 'Jan 13',
            modifiedBy: 'Ramesh Devar',
            sharedWith: 'Diralla singh',
            type: 'spreadsheet'
        },
        {
            name: 'first_vlog',
            size: '119MB',
            createdAt: 'Feb 13',
            modifiedBy: 'Pallavi Devar',
            sharedWith: 'Diralla singh',
            type: 'doc'
        },
        {
            name: 'third_vlog',
            size: '119MB',
            createdAt: 'Feb 13',
            modifiedBy: 'Pallavi Devar',
            sharedWith: 'Diralla singh',
            type: 'pdf'
        },
        {
            name: 'second_vlog',
            size: '119MB',
            createdAt: 'Feb 13',
            modifiedBy: 'Pallavi Devar',
            sharedWith: 'Diralla singh',
            type: 'music'
        },

    ];


const FileList = ({ fileList }: any) => {
    return (
        <>
        <Table fileList={fileList} />
        </>
    )
}

export const FilesTab = () => {
    return (
        <div className="space-y-2 px-6 ">
            <FileList fileList={fileList} />
        </div>
    )
}
