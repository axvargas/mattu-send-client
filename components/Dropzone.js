import React, { useContext, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useToasts } from 'react-toast-notifications'
import AppContext from '../context/app/appContext'
import AuthContext from '../context/auth/authContext'
import Form from './Form'
const Dropzone = () => {
    // * Toast hook
    const { addToast } = useToasts()

    // * Extarct things from context
    const { loading, uploadFileFn, createLinkFn } = useContext(AppContext)

    // * Extarct things from context
    const { authenticated } = useContext(AuthContext)

    const onDropRejected = () => {
        addToast('Your file is larger than 1MB. Sign in to upload heavy files', { appearance: 'error', autoDismissTimeout: 7000 })
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        // * FormData creation
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        uploadFileFn(formData, acceptedFiles[0].path)
    }, [])

    // * Get things from the hook
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: authenticated ? 1000000 * 16 : 1000000
    })

    const files = acceptedFiles.map((file) => (
        <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-semibold text-xl">{file.path}</p>
            <p className="text-sm text-gray-600">{(file.size / Math.pow(1024, 2)).toFixed(2)}{' MB'}</p>
        </li>
    ))



    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 rounded-lg">
            {acceptedFiles.length > 0 ?
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-semibold text-center mb-4">File</h4>
                    <ul>
                        {files}
                    </ul>
                    {authenticated &&
                        <Form />
                    }
                    {loading ?
                        <p className="my-10 text-center text-gray-600">Uploading file...</p>
                        :
                        <button
                            className="font-semibold bg-gray-700 w-full py-3 rounded text-white my-10 hover:bg-gray-800 uppercase"
                            type="button"
                            onClick={() => createLinkFn()}
                        >
                            Create link
                        </button>
                    }
                </div>
                :
                <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                    <input className="h-100" {...getInputProps()} />
                    <div className="text-center">
                        {isDragActive ?
                            <p className="text-2xl text-center text-gray-600">Drop your file here</p>
                            :
                            <>
                                <p className="text-2xl text-center text-gray-600">Drag your file here</p>
                                <button
                                    className="font-semibold bg-gray-700 w-full py-3 rounded text-white my-10 hover:bg-gray-800"
                                    type="button"
                                >
                                    Select your file to upload
                                </button>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Dropzone
