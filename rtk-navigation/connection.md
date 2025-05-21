# 连接设置

在进入操作界面前，需要连接RTK导航系统路由器的WIFI热点，登入机器人的IP才能正常使用。

:::tip 提示
如果是Ubuntu系统，在连接界面IP前，确保导航服务ros_mqtt_control是否启动，新开终端输入:
```bash
roslaunch ros_mqtt_control ros_mqtt_control.launch
```
:::

## 开机启动与界面初始化

1. **连接WIFI**：电脑连接导航系统路由器的WIFI热点，填写正确的账号密码

2. **启动程序**：双击打开exe文件

   ![](/images/rtk-navigation/image3.png)
   
   *exe文件程序所在位置*

3. **连接IP**：在URL输入框中输入小车IP地址：如http://192.168.1.102:1883（请以实际为准），然后点击【连接】。当连接成功后，连接状态变为断开状态，连接成功后其他按钮解除禁用，此时界面才算正常初始化。

   ![](/images/rtk-navigation/image4.png)
   
   *界面连接成功，初始化状态* 
