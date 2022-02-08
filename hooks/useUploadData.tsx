import React, { ChangeEvent } from 'react'

import { useState, useRef } from 'react'
import { storage } from '../lib/firebase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { IuseUploadDataReult } from '@/models/.'

const useUploadData:(path: string, ext?:string) => IuseUploadDataReult = (path = 'posts/images/', ext = '') => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dataUrl, setDataUrl] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const cleanImage = () => {
    setUrl('')
    setDataUrl('')
  }

  const triggerInput = () => fileInputRef.current.click()

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]

    if (file) {
      getUploadedData(file)
    }
  }
  
  const getUploadedData = async(file: File | string) => {

    if (typeof file === "string") {
      return await UploadFile(file)
    }

    try {

      const reader = new FileReader()

      reader.readAsDataURL(file)
  
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target.result.toString()
  
        setDataUrl(dataUrl)
  
        await UploadFile(dataUrl)
        
      }
      
    } catch (e) { setError(e) }

  }

  const UploadFile =  async (dataUrl: string) => {
    setLoading(true)
    const fileRef = ref(storage, path + (Math.random().toString(36).substring(2, 12) + Date.now().toString()) + ext)

    await uploadString(fileRef, dataUrl, 'data_url')
    const url = await getDownloadURL(fileRef)

    setUrl(url)

    setLoading(false)
  }

  const bind = {
    onChange: onFileChange,
    ref: fileInputRef
  }

  return {dataUrl, url, getUploadedData, loading, error, triggerInput, onFileChange, fileInputRef, cleanImage, bind}
}

export default useUploadData