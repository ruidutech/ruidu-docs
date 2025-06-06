# 连接机器人

## 通过内网连接

### 方法一：使用默认配置

1. 通过手机或平板连接机器人无线WIFI
   - WIFI密码：12345678
   ![WIFI连接](/images/deeprobot01/software-guide/image1.png)

2. 连接WIFI后，打开机器人操作平台APP
   ![打开APP](/images/deeprobot01/software-guide/image2.png)

3. 在登录界面的选择机器人名称栏，选择"本地连接"选项
   - 每次退出到登录界面时，都会默认选择"本地连接"选项

### 方法二：使用自定义配置

1. 连接机器人WIFI（密码：12345678）

2. 打开APP后，进行机器人配置：
   1. 点击【机器人配置】，进入设备配置界面
      ![设备配置](/images/deeprobot01/software-guide/image3.png)
   
   2. 点击【添加】按钮，输入以下信息：
      - 机器人名称
      - IP地址
      - 端口
      ![添加设备](/images/deeprobot01/software-guide/image4.png)

   3. 点击【返回】退出设备配置界面

3. 登录系统
   - 选择添加的机器名称
   - 用户名：admin
   - 密码：123456
   ![APP首页](/images/deeprobot01/software-guide/image5.png)

::: warning 连接故障处理
如果连接WIFI后APP无法连接登录控制器，可以尝试修改WIFI连接方式为静态连接/手动设置：
- IP地址：192.168.1.210（建议使用200-255之间的值，防止地址冲突）
- 子网掩码：255.255.255.0
- 路由器：192.168.1.1
- DNS：8.8.8.8
::: 
