import {
    message, Tabs, List, Card, Button
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { getLabelByUser, deleteLabel } from "../utils";
import AddLabel from "./AddLabel";

const { TabPane } = Tabs;

class HostHomePage extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                <TabPane tab="My Labels" key="1">
                    <MyLabels />
                </TabPane>
                <TabPane tab="Add Label" key="2">
                    <AddLabel />
                </TabPane>
            </Tabs>
        );
    }
}


class RemoveLabelButton extends React.Component {
    state = {
        loading: false,
    };

    handleRemoveStay = async () => {
        const { stay, onRemoveSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await deleteLabel(stay.id);
            onRemoveSuccess();
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
            <Button
                loading={this.state.loading}
                onClick={this.handleRemoveStay}
                danger={true}
                shape="round"
                type="primary"
            >
                Delete Label
            </Button>
        );
    }
}

class MyLabels extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getLabelByUser();
            this.setState({
                data: resp,
            });
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
            <List
                loading={this.state.loading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.id}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                </div>
                            }
                            extra={<RemoveLabelButton stay={item} onRemoveSuccess={this.loadData} />}
                        >
                            <p>Label added by user</p>
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

export default HostHomePage;