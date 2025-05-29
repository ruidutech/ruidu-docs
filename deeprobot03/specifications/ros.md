# ROS 通讯包使用说明

## 5.1 CAN 分析仪权限设置

首次使用CAN 分析仪时需要设置先设置权限

### 方法一：创建 udev 规则

在终端中输入命令：

```bash
sudo bash -c "echo 'ACTION==\"add\", SUBSYSTEMS==\"usb\", ATTRS{idVendor}==\"04d8\", ATTRS{idProduct}==\"0053\", GROUP=\"users\", MODE=\"0777\"' >> /etc/udev/rules.d/99-usbcan.rules"
```

输入命令后，重新插拔CAN 分析仪的USB 数据线后生效，重启系统后仍有效。

### 方法二：手动设置设备权限

1. 输入命令

```bash
lsusb
```

2. 记录下设备名称Microchip Technology, Inc.所对应的【Bus】和【Device】的值。

例：Bus 001 Device 006:ID 04d8:0053 Microchip Technology, Inc.

Bus 为001，Device 为006

3. 输入命令

```bash
sudo chmod 777 /dev/bus/usb/【Bus id】/【Device id】
```

把上方命令中的【Bus id】和【Device id】替换为步骤2中获得的值，手动赋予对应设备权限，

例：

```bash
sudo chmod 777 /dev/bus/usb/001/006
```

## 5.2 ROS 通讯包编译与使用

### 5.2.1 创建并初始化工作空间

分别在终端中输入以下命令

```bash
cd ~
mkdir catkin_ws
mkdir catkin_ws/src
cd catkin_ws/src
catkin_init_workspace
cd ..
```

### 5.2.2 编译

把ROS 包复制到上面步骤创建的src 文件夹中

输入命令：

```bash
catkin_make
```

等待编译完成后初始化环境变量，输入命令：

```bash
source ./devel/setup.bash
```

### 5.2.3 启动

输入命令：

```bash
roslaunch mt_control_can mt_control_can.launch
```

### 5.2.4 查看节点发布的底盘信息

查看速度反馈

```bash
rostopic echo /mt/velocity_info
```

查看轮速反馈

```bash
rostopic echo /mt/speed_info
```

查看电流反馈

```bash
rostopic echo /mt/current_info
```

查看原始数据

```bash
rostopic echo /mt/buff_info
```

详细内容参考ROS 包内的说明文件

### 5.2.5 发布话题控制底盘

速度、角度指令示例：

```bash
rostopic pub -r 10 /mt/velocity_ctrl geometry_msgs/Twist "linear:
  x: 1.0
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.349"
```

打开急停

```bash
rostopic pub /mt/stop_ctrl std_msgs/UInt8 "data: 1"
```

关闭急停

```bash
rostopic pub /mt/stop_ctrl std_msgs/UInt8 "data: 0"
```

清除碰撞状态

```bash
rostopic pub /mt/collision_clear std_msgs/UInt8 "data: 1"
```

尝试清除错误状态

```bash
rostopic pub /mt/try_clear_error std_msgs/UInt8 "data: 1"
``` 
