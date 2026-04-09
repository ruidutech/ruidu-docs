# 服务管理

## 系统服务

基础服务 => `/iotp/base/xxx`

上层业务服务 => `/iotp/standard/cemos-xxx`

```sh
# 进入 pdgw 服务控制脚本目录
cd /iotp/base/pdgw/script
# 启动或停止 pdgw 服务
./start.sh
./stop.sh
# 进入 cemos-gateway 服务控制脚本目录
cd /iotp/standard/cemos-gateway/script
# 启动或停止 cemos-gateway 服务
./start.sh
./stop.sh
```

## 第三方组件

包括 `redis、mysqld(mariadb)、zookeeper、kafka、nacos、nginx、vsftpd` 等，统一通过 `systemctl` 管理：

```sh
# 查看状态
systemctl status xxx
# 停止
ystemctl stop xxx
# 启动
systemctl start xxx
# 重启
systemctl restart xxx
```

## 所有服务

```sh
# 进入安装解压目录下的脚本文件夹
cd /home/cemosv3._*/script
# 停止所有服务
./stop_cemos.sh
# 启动所有服务
./start_cemos.sh
```
