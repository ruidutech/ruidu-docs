#!/usr/bin/env python3
"""生成使用手册占位图（纯 Python，无三方依赖）。

PNG：浅灰底 + 斜线交叉纹 + 边框，尺寸按内容类型区分（page 1600x900 / panel 800x900 / dialog 900x600）
GIF：1x1 最小合法 GIF

用法: python3 scripts/gen-placeholders.py
"""
import os
import struct
import zlib

OUT_DIR = "public/images/orbitcontrol/user-guide"

# (文件名, 宽, 高)
PAGES = [
    # 快速开始
    ("auth-page-login.png", 900, 600),
    ("auth-page-register.png", 900, 700),
    ("tenant-page-guide.png", 1200, 700),
    ("tenant-page-new.png", 900, 700),
    # 平台总览
    ("platform-page-layout.png", 1600, 900),
    ("platform-menu-user.png", 700, 800),
    ("platform-menu-notification.png", 700, 800),
    # 地图与图层
    ("map-toolbar-map-tools.png", 800, 200),
    # 设备控制
    ("devices-page-list.png", 1600, 900),
    ("devices-panel-control.png", 800, 900),
    ("devices-panel-fpv.png", 800, 600),
    ("devices-panel-joystick.png", 800, 600),
    ("devices-panel-alarm.png", 800, 600),
    ("devices-panel-alert.png", 800, 600),
    ("devices-dialog-mission-selector.png", 900, 700),
    ("devices-dialog-lease-preempt.png", 800, 400),
    ("devices-dialog-initial-gps.png", 800, 500),
    ("devices-flow-initial-pose.gif", 1, 1),
    # 视频墙
    ("video-wall-page-grid.png", 1600, 900),
    ("video-wall-dialog-select-device.png", 900, 600),
    # 任务
    ("missions-page-list.png", 1600, 900),
    ("missions-form-path.png", 1600, 900),
    ("missions-form-path-waypoint.png", 900, 700),
    # 计划
    ("schedules-page-list.png", 1600, 900),
    ("schedules-dialog-edit.png", 1000, 800),
    # 自动化流程
    ("flows-page-list.png", 1600, 900),
    ("flows-form-new.png", 1600, 900),
    ("flows-page-logs.png", 1600, 900),
    # 标注
    ("annotations-page-main.png", 1600, 900),
    ("annotations-toolbar-draw.png", 900, 120),
    # 路网
    ("route-graph-page-main.png", 1600, 900),
    ("route-graph-panel-inherit.png", 800, 600),
    ("route-graph-dialog-inherit-source.png", 900, 600),
    ("route-graph-flow-recording.gif", 1, 1),
    # 语音库
    ("voices-page-list.png", 1600, 900),
    ("voices-dialog-generate.png", 900, 700),
    # 运行日志
    ("executions-page-list.png", 1600, 900),
    ("executions-page-detail.png", 1600, 900),
    # 画廊
    ("gallery-page-list.png", 1600, 900),
    # 回放
    ("replay-page-main.png", 1600, 900),
    ("replay-flow-playback.gif", 1, 1),
    # 站点管理
    ("mgr-sites-page-list.png", 1600, 900),
    ("mgr-sites-dialog-edit.png", 1200, 900),
    # 设备管理
    ("mgr-devices-page-list.png", 1600, 900),
    ("mgr-devices-dialog-register.png", 900, 600),
    ("mgr-devices-page-detail.png", 1600, 900),
    # 地图管理
    ("mgr-maps-page-list.png", 1600, 900),
    ("mgr-maps-dialog-mapping-switch.png", 900, 500),
    ("mgr-maps-dialog-delete.png", 900, 500),
    # 用户管理
    ("mgr-users-page-list.png", 1600, 900),
    # 应用管理
    ("mgr-integrations-page-list.png", 1600, 900),
    ("mgr-integrations-dialog-create.png", 1000, 800),
    # 企业管理
    ("mgr-tenant-page-main.png", 1600, 900),
    ("mgr-tenant-panel-invite.png", 1000, 600),
]

# 最小合法 GIF（1x1 透明）
MIN_GIF = bytes.fromhex(
    "47494638396101000100800000"
    "ffffff"
    "2c00000000010001000002024401003b"
)


def write_png(path: str, w: int, h: int) -> None:
    bg, border, cross = (245, 247, 249), (203, 213, 225), (226, 232, 240)

    def chunk(tag: bytes, data: bytes) -> bytes:
        return (
            struct.pack(">I", len(data))
            + tag
            + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    raw = bytearray()
    for y in range(h):
        raw.append(0)  # filter: none
        for x in range(w):
            if x < 4 or y < 4 or x >= w - 4 or y >= h - 4:
                c = border
            elif (x + y) % 48 < 2 or (x - y) % 48 < 2:
                c = cross
            else:
                c = bg
            raw += bytes(c)

    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + chunk(b"IEND", b"")
    )
    with open(path, "wb") as f:
        f.write(png)


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, w, h in PAGES:
        path = os.path.join(OUT_DIR, name)
        if os.path.exists(path):
            print(f"skip  {name}")
            continue
        if name.endswith(".gif"):
            with open(path, "wb") as f:
                f.write(MIN_GIF)
        else:
            write_png(path, w, h)
        print(f"create {name}")
    print(f"\ntotal {len(PAGES)} files")


if __name__ == "__main__":
    main()
