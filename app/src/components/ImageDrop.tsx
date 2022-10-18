import { Dispatch, SetStateAction, useCallback } from 'react'
import { Div, DivProps, Img } from 'honorable'
import { useDropzone } from 'react-dropzone'

type ImageDropProps = Omit<DivProps, 'onChange'> & {
  value: File[]
  onChange: Dispatch<SetStateAction<File[]>>
}

function ImageDrop({ value, onChange, ...props }: ImageDropProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange((x: File[]) => [...x, ...acceptedFiles])
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
  })

  const renderDropzone = useCallback(() => (
    <Div
      {...getRootProps()}
      p={1}
      cursor="pointer"
      borderRadius="medium"
      border={`1px solid ${isDragActive ? 'success' : 'border'}`}
    >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop a PNG or JPEG file here ...</p> :
          <p>Drag 'n' drop a PNG or JPEG file here, or click to select file</p>
      }
    </Div>
  ), [getRootProps, getInputProps, isDragActive])

  const renderImagePreview = useCallback(() => {
    if (!value) return null

    return (
      <Div xflex="x4">
        {value.map((file, i) => (
          <Img
            key={i}
            src={URL.createObjectURL(file)}
            maxWidth="100%"
            flexGrow={1}
            flexShrink={1}
          />
        ))}
      </Div>
    )
  }, [value])

  return (
    <Div {...props}>
      {value ? renderImagePreview() : renderDropzone()}
    </Div>
  )
}

export default ImageDrop
