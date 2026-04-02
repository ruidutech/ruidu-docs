# 常见问题

### 环境变化后，删除 nacos 缓存，重启所有服务

1. 删除 `/home/streamax/` 目录下的，`log logs nacos` 文件夹
2. 重启 `auth message adapter gateway` 等几个服务
3. 本机开发时，修改 `cemos-gateway_application.properties`

将 `spring.security.oauth2.resourceserver.jwt.jwk-set-uri` 改为本机 ip，不用本机开发时，复原，保险起见，修改后重启 `nacos`

```properties
...
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://${base.ip}:${base.port}/rsa/publicKey
#spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://192.168.144.209:${base.port}/rsa/publicKey
...
```
