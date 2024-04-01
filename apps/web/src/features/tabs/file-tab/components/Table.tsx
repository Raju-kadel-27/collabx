import { FaFolderOpen } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import './index.css';

interface FileList {
    name: string;
    size: string;
    createdAt: string;
    modifiedBy: string;
    sharedWith: string;
    type: string;
}

enum FileIconType {
    FOLDER = 'folder',
    VIDEO = 'video',
    DOC = 'doc',
    PDF = 'pdf',
    MUSIC = 'music',
    SPREADSHEET = 'spreadsheet',
    IMAGE = 'image'
}

const IconProvider = (
    {
        type,
        iconSize = 24,
        iconColor = 'gray'
    }: {
        type: string;
        iconSize?: number;
        iconColor?: string
    }
) => {
    switch (type) {
        case FileIconType.FOLDER:
            return <FaFolderOpen size={iconSize} color={iconColor} />
        case FileIconType.DOC:
            return <IoDocumentTextSharp size={iconSize} color={iconColor} />
        case FileIconType.PDF:
            return <FaFilePdf size={iconSize} color={iconColor} />
        case FileIconType.MUSIC:
            return <FaMusic size={iconSize} color={iconColor} />
        case FileIconType.VIDEO:
            return <FaPlayCircle size={iconSize} color={iconColor} />
        case FileIconType.SPREADSHEET:
            return <FaFileExcel size={iconSize} color={iconColor} />
        case FileIconType.IMAGE:
            return <FaImage size={iconSize} color={iconColor} />
        default:
            return;
    }
}

export const Table =
    (
        { fileList }: { fileList: any }) => {
        return (
            <>
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mx-auto">
                        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white ">
                            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">

                                <div className="flex-auto block py-2  px-9">
                                    <div className="overflow-x-auto">
                                        <table className="w-full my-0 align-middle text-dark border-neutral-200 mb-16">

                                            <thead className="align-bottom">
                                                <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                    <td className="pb-3 text-start w-48">Name</td>
                                                    <td className="pb-3 text-end w-[220px]">Size</td>
                                                    <td className="pb-3 text-end w-[220px]">CreatedAt</td>
                                                    <td className="pb-3 pr-12 text-end w-[250px]">ModifiedBy</td>
                                                    <td className="pb-3 pr-12 text-end w-[200px]">SharedWith</td>
                                                </tr>
                                            </thead>

                                            <tbody >
                                                {
                                                    fileList.map((file: FileList,i) => (
                                                        <tr className="border-b my-2">

                                                            <td className="p-3 pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                                        <IconProvider type={file.type} />
                                                                    </div>
                                                                    <div className="flex w-24 flex-col justify-start">
                                                                        <span>{file.name}</span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className=" w-48 text-ellipsis p-3 text-center pr-8">
                                                                <span className=" w-8 text-light-inverse text-md/normal">{file.size}</span>
                                                            </td>
                                                            <td className=" w-48 text-ellipsis p-3 pr-0 text-center">
                                                                <span className="text-center text-sm  bg-green-100 rounded-full px-2 py-1  ">
                                                                    {file.createdAt}
                                                                </span>
                                                            </td>
                                                            <td className=" w-48 text-ellipsis p-3 pr-12 text-center">
                                                                <span className="text-center w-48 ">
                                                                    {file.modifiedBy}
                                                                </span>
                                                            </td>
                                                            <td className=" w-48 text-ellipsis pr-0 text-center">
                                                                <span className="">{file.sharedWith}</span>
                                                            </td>

                                                        </tr>
                                                    ))
                                                }

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
