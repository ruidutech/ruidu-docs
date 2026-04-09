# IP 替换

## 全量替换公网 IP

1. 执行脚本：

```sh
# 进入安装解压目录下的脚本文件夹
cd /home/cemosv3._*/script
# 执行 replace_public_ip.sh 脚本，参数为 原 IP 和目标 ip
./replace_public_ip.sh 192.168.144.78 ruidu.xyz
```

2. 清理缓存

```sh
rp=$(cat /iotp/env/redis/redis.conf | grep requirepass | awk '{print $2}' | sed 's/"//g')
/iotp/env/redis/src/redis-cli -p 16379 -a $rp del cms:admin:setting::general
/iotp/env/redis/src/redis-cli -p 16379 -a $rp del cms:admin:setting::sip
```

如下显示时表示清理成功：

```
[root@192 script]# /iotp/env/redis/src/redis-cli -p 16379 -a $rp del cms:admin:setting::general
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
(integer) 1
[root@192 script]# /iotp/env/redis/src/redis-cli -p 16379 -a $rp del cms:admin:setting::sip
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
(integer) 1
```

3. 重启服务，参考： [重启所有服务](./services.md#所有服务)
