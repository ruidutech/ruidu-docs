# 通讯协议（串口）

::: info 版本信息
协议版本：1.0.3.241127
:::

## 通讯参数

| 参数 | 值 |
|------|-----|
| 波特率 | 115200 |
| 数据位 | 8 |
| 校验位 | None |
| 停止位 | 1 |

## 上位机下发指令

::: tip 使用说明
- 当遥控器未开启时，可直接由上位机通讯控制
- 在遥控器模式下需要将SWB开关拨到中间档位
:::

### 20ms 底盘数据上传(ID=0x01)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x01） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0：关闭20ms数据上传<br>1：开启20ms数据反馈 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 关闭20ms数据上传：`ED DE 01 00 01 0C 00 00 D9 01 BD BC`
- 开启20ms数据反馈：`ED DE 01 00 01 0C 01 00 DA 01 BD BC`
- 命令返回：0x81

### 底盘数据指令控制、线速模式(ID=0x02)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x02） |
| FRAME-LEN | 1(uint8) | 帧长度（0x12） |
| Data0 | 2(uint16) | 0x0000（线速模式） |
| Data1 | 2(int16) | Vx (x轴速度) 单位：mm/s |
| Data2 | 4(float) | Vz (z轴速度) 单位：rad/s |
| Data3 | - | - |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 02 12 00 00 C8 00 00 00 00 00 A7 02 BD BC ( Vx=200, Vz=0 )`

### 底盘数据指令控制、轮速度模式(ID=0x02)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x02） |
| FRAME-LEN | 1(uint8) | 帧长度（0x12） |
| Data0 | 2(uint16) | 0x0001（轮速模式） |
| Data1 | 2(int16) | 左侧速度单位：mm/s(前左轮和后左轮速度一致) |
| Data2 | 2(int16) | 右侧速度单位：mm/s(前右轮和后右轮速度一致) |
| Data3 | 2(uint16) | 保留 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 02 12 01 00 C8 00 C1 00 00 00 69 03 BD BC ( Lsp=200, Rsp=193 )`

### 急停设置(ID=0x03)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x03） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0：取消急停<br>1：急停 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 取消急停：`ED DE 00 00 03 0C 00 00 DA 01 BD BC`
- 急停：`ED DE 00 00 03 0C 01 00 DB 01 BD BC`

### 清除故障(ID=0x05)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x05） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | Bit0: 清除驱动器故障（1：生效）<br>Bit1: 清除前防撞杆故障（1：生效）<br>Bit2: 清除防后撞杆故障（1：生效） |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 清除驱动器故障：`ED DE 00 00 05 0C 01 00 DD 01 BD BC`
- 清除前防撞杆故障：`ED DE 00 00 05 0C 02 00 DD 01 BD BC`
- 清除防后撞杆故障：`ED DE 00 00 05 0C 04 00 DD 01 BD BC`

### 回冲设置(ID=0x06)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x06） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 1：开启；0：关闭 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 开启回冲：`ED DE 00 00 06 0C 01 00 DE 01 BD BC`
- 关闭回冲：`ED DE 00 00 06 0C 00 00 DD 01 BD BC`

### 读取程序版本的信息(ID=0x07)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x07） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 读取：`ED DE 00 00 07 0C 00 00 DE 01 BD BC`（反馈ID: 0X87）

### 查看硬件版本信息(ID=0x08)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x08） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 08 0C 00 00 DF 01 BD BC`（反馈ID:0X88）

### 查看底盘信息(ID=0x09)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x09） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 09 0C 00 00 E0 01 BD BC`（反馈ID: 0X89）

### 查看出货日期信息(ID=0x0A)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x0A） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0x0000 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 0A 0C 00 00 E1 01 BD BC`（反馈ID: 0X8A）

### 读取驱动器的状态(ID=0xB0)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB0） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 1：读取 |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 读取：`ED DE 00 00 B0 0C 01 00 88 02 BD BC`

### 开启/关闭驱动器电流、电压上传(ID=0xB1)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB1） |
| FRAME-LEN | 1(uint8) | 帧长度（0x0C） |
| Data | 2(uint16) | 0:关闭上传(20Hz)<br>1:开启上传(20Hz) |
| Check | 2(uint16) | 校验（从FRAME-HEAD到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- 开启：`ED DE 00 00 B1 0C 01 00 89 02 BD BC`
- 关闭：`ED DE 00 00 B1 0C 00 00 88 02 BD BC`

## 底盘数据上传

### 底盘50hz数据回传，线速和轮速模式(ID=0x81)

底盘启动后会自动上传该帧，可使用【20ms 底盘数据上传】关闭上传。

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x81） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data0 | 2(uint16) | 电压：单位0.1V |
| Data1 | 2(uint16) | 底盘状态 <br> Bit0: 硬件急停（1表示急停） <br> Bit1: 遥控急停（1表示急停） <br> Bit2: 软件急停（1表示急停） <br> Bit3: 遥控掉线（1表示掉线） <br> Bit4: 前驱动器掉线（1表示掉线） <br> Bit5: 后驱动器掉线（1表示掉线） <br> Bit6: 前左驱动器错误（1表示错误） <br> Bit7: 前右驱动器错误（1表示错误） <br> Bit8: 后左驱动器错误（1表示错误） <br> Bit9: 后右驱动器错误（1表示错误）<br> Bit10: 前防撞杆（1表示触发）<br> Bit11: 后防撞杆（1表示触发）<br> Bit12: 回冲设置（1表示开启）<br> Bit13-14: 保留<br> Bit15: 保留 |
| Data2 | 2(uint16) | 回冲状态（数值）<br>0：寻找中心<br>1：已找到中心<br>2：信号丢失<br>3：铜片接触<br>4：对接成功<br>5：对接错误<br>6：寻充超时<br>7：退出充电状态 |
| Data3 | 2(int16) | Vx:线速度，单位：mm/s |
| Data4 | 2(int16) | Vz:角速度，单位：0.001rad/s |
| Data5 | 2(int16) | 前左轮速度，单位：mm/s |
| Data6 | 2(int16) | 前右轮速度，单位：mm/s |
| Data7 | 2(int16) | 后左轮速度，单位：mm/s |
| Data8 | 2(int16) | 后右轮速度，单位：mm/s |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

### 驱动器信息上传(ID=0xB0)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB0） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data0 | 2(uint16) | 驱动器（前左）错误状态<br>Bit0: 电池欠压<br>Bit1: 位置异常<br>Bit2: 霍尔错误<br>Bit3: 过流<br>Bit4: 超载<br>Bit5: EEPROM故障<br>Bit6: IGBT故障<br>Bit7: 驱动器过热<br>Bit8: 电机缺陷<br>Bit9: 电源超差<br>Bit10: 速度超差<br>Bit11: 电机过热<br>Bit12: 电源过压<br>Bit13: 飞车故障<br>Bit14: 驱动器过热<br>Bit15: 保留 |
| Data1 | 2(uint16) | 驱动器（前右）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样 |
| Data2 | 2(uint16) | 驱动器（后左）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样 |
| Data3 | 2(uint16) | 驱动器（后右）错误状态<br>内容同【Data0 驱动器（前左）错误状态】一样 |
| Data4 | 2(uint16) | 电机状态（前左）<br>Bit0: 伺服启动<br>Bit1: 伺服运行<br>Bit2: 零速运行<br>Bit3: 目标速度到达<br>Bit4: 目标位置到达<br>Bit5: 转矩限制中<br>Bit6: 警告<br>Bit7: 制动输出<br>Bit8: 原点恢复完成<br>Bit9: 超过载门槛<br>Bit10: 错误警告<br>Bit11: 命令完成<br>Bit12: 反向堵转<br>Bit13: 正向堵转 |
| Data5 | 2(uint16) | 电机状态（前右）<br>内容同【Data4 电机状态（前左）】一样 |
| Data6 | 2(uint16) | 电机状态（后左）<br>内容同【Data4 电机状态（前左）】一样 |
| Data7 | 2(uint16) | 电机状态（后右）<br>内容同【Data4 电机状态（前左）】一样 |
| Data8 | 2(int16) | 电流（前左）（单位：0.1A） |
| Data9 | 2(int16) | 电流（前右）（单位：0.1A） |
| Data10 | 2(int16) | 电流（后左）（单位：0.1A） |
| Data11 | 2(int16) | 电流（后右）（单位：0.1A） |
| Data12 | 2(uint16) | 最大电流值（前左）（单位：0.1A，只取正值） |
| Data13 | 2(uint16) | 最大电流值（前右）（单位：0.1A，只取正值） |
| Data14 | 2(uint16) | 最大电流值（后左）（单位：0.1A，只取正值） |
| Data15 | 2(uint16) | 最大电流值（后右）（单位：0.1A，只取正值） |
| Data16 | 2(uint16) | 温度（前）（单位：0.1摄氏度） |
| Data17 | 2(uint16) | 温度（后）（单位：0.1摄氏度） |
| Data18 | 2(uint16) | 驱动器电压（前）（单位：0.1V） |
| Data19 | 2(uint16) | 驱动器电压（后）（单位：0.1V） |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

### 驱动器电流、电压信息上传(ID=0xB1)

该帧可以开启自动上传，使用【读取驱动器的信息（驱动器电流、电压）(ID=0xB1)】开启关闭上传。

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0xB1） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data0 | 2(int16) | 电流（前左）（单位：0.1A） |
| Data1 | 2(int16) | 电流（前右）（单位：0.1A） |
| Data2 | 2(int16) | 电流（后左）（单位：0.1A） |
| Data3 | 2(int16) | 电流（后右）（单位：0.1A） |
| Data4 | 2(uint16) | 驱动器电压（前）（单位：0.1V） |
| Data5 | 2(uint16) | 驱动器电压（后）（单位：0.1V） |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

### 程序版本信息上传(ID=0X87)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x87） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data | 2(uint16) | 值 |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

### 硬件版本信息上传(ID=0x88)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x88） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data | N | 接收到16进制需要转化成ASCII码对应的字母 |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 88 22 5A 48 57 4C 2D 62 72 75 73 68 2D 6D 6F 74 6F 72 2D 63 68 61 73 73 69 73 83 0B BD BC`（对应的ASCII码：ZKWL-brush-motor-chassis）

### 底盘信息上传(ID=0X89)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x89） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data0 | 2(uint16) | 轮距 |
| Data1 | 2(uint16) | 轴距 |
| Data2 | 2(uint16) | 轮径 |
| Data3 | 2(uint16) | 减速比 |
| Data4 | 2(uint16) | 编码器线数 |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 89 12 D5 02 F4 01 AA 00 1E 00 E8 03 E5 05 BD BC` ( D5 02：轮距725; F4 01：轴距500; AA 00：轮径170; 1E 00：减速比30; E8 03：编码器线数1000 )

### 出货日期信息上传(ID=0X8A)

| 内容 | 字节长度 | 备注 |
|------|----------|------|
| FRAME-HEAD | 2(uint16) | 帧头（0xDEED） |
| FRAME-NUMS | 2(uint16) | 帧序号（递增，可用来记录发送的次数） |
| FRAME-ID | 1(uint8) | 帧ID（0x8A） |
| FRAME-LEN | 1(uint8) | 帧长度 |
| Data0 | 1(uint8) | 年 |
| Data1 | 1(uint8) | 月 |
| Data2 | 1(uint8) | 日 |
| Check | 2(uint16) | 校验（从Head到Data的和） |
| FRAME-END | 2(uint16) | 帧尾(0xBCBD) |

示例：
- `ED DE 00 00 8A 0D 18 01 02 7D 02 BD BC` ( 24年1月2日 )


