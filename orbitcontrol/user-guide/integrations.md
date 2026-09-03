# 应用管理

「应用管理」创建和管理第三方 **API 应用**：为外部系统（如调度中心、数据平台）签发 App Key 和密钥，并配置其可访问的资源与操作权限。平台开放接口的调用方式参见 [开放平台 API 文档](/orbitcontrol/open-platform/)。

## 应用列表

![](/images/orbitcontrol/user-guide/mgr-integrations-page-list.png)

列表展示所有应用，支持按名称搜索、分页，每个应用可**查看密钥**、**编辑**、**权限**配置和**删除**。

## 创建应用

点击「创建应用」，填写应用名称（必填）和描述（可选）。

![](/images/orbitcontrol/user-guide/mgr-integrations-dialog-create.png){.w-1/2}

创建后进入详情页**配置权限**：选择该应用可以访问的资源类型和操作权限。

## 密钥管理

查看应用密钥时可以看到 **App Key** 和 **App Secret**（可一键复制）：

![](/images/orbitcontrol/user-guide/mgr-integrations-dialog-gen.png){.w-1/2}

- ⚠️ 请妥善保管密钥，泄露后请立即**重新生成**
- **重新生成密钥**会使旧密钥立即失效，使用旧密钥的集成需要更新
