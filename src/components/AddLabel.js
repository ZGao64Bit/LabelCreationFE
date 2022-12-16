import React from "react";
import { Form, Input, Button, message } from "antd";
import { uploadStay } from "../utils";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class AddLabel extends React.Component {
    state = {
        loading: false,
    };

    fileInputRef = React.createRef();

    handleSubmit = async (values) => {
        const formData = new FormData();

        formData.append("name", values.name);


        this.setState({
            loading: true,
        });
        try {
            await uploadStay(formData);
            message.success("Label Added");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        return (
            <Form
                {...layout}
                name="nest-messages"
                onFinish={this.handleSubmit}
                style={{ maxWidth: 500, margin: "auto" }}
            >
                <Form.Item name="name" label="Label" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default AddLabel;
