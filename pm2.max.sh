# 后台服务器
pm2 start server/index.js -i max
echo "后台服务器开启成功"

# mqtt 服务器
pm2 start mqtt/index.js -i max
echo "MQTT服务器开启成功"

# 静态文件服务器
pm2 start files/index.js -i max
echo "文件服务器开启成功"
