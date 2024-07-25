import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/index'

const { Option } = Select

const Publish = () => {
  const { channelList } = useChannel()
  // 控制图片Type
  const [imageType, setImageType] = useState(0)
  // 上传图片
  const [imageList, setImageList] = useState([])
  const onFinish = (formValues) => {
    const { title, content, channel_id } = formValues
    const repData = {
      title,
      content,
      cover:{
        type: imageType,
        images: imageList.map(item=>{
          if(item.response){
            return item.response.data.url
          }else{
            return item.url
          }
        })
      },
      channel_id
    }
    if(articleId){
      updateArticleAPI({...repData,id:articleId})
    }else{
      createArticleAPI(repData)
    }
  }

  const onUploadChange = (info) => {
    console.log(1232321,info)
    setImageList(info.fileList)
  }
  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }
  const [ searchParams ] = useSearchParams()
  const articleId = searchParams.get('id')
  const [ form ] = Form.useForm()
  useEffect(()=>{
    async function ads (){
      const res = await getArticleById(articleId)
      form.setFieldsValue({
        ...res.data,
        type:res.data.cover.type,
      })
      setImageType(res.data.cover.type)
      setImageList(res.data.cover.images.map(url=>{
        return {url}
      }))
    }
    if(articleId){
      ads()
    }
  },[articleId, form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId}`?'编辑文章':'发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
              </Form.Item>
              { imageType>0 &&<Upload
                 name="image"
                 listType="picture-card"
                 className="avatar-uploader"
                 showUploadList
                 action={'http://geek.itheima.net/v1_0/upload'}
                 fileList={imageList}
                 onChange={onUploadChange}
                 maxCount={imageType}
                 multiple={imageType > 1}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>}
            </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish