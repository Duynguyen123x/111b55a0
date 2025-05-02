// ========= Script by Duynguyenx ========= //
// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Fixed Section ========= //
// =========  @duynguyenx ========= //

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thêm thông báo cảnh báo
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Thông tin đăng ký giả lập
var duynguyenx = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

var duynguyenx = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.duynguyenx.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Kiểm tra xem User-Agent có khớp với key trong mapping không
const match = Object.keys(mapping).find(key => ua.includes(key));

if (match) {
  let [entitlement, productId] = mapping[match];
  if (productId) {
    duynguyenx.product_identifier = productId;
    obj.subscriber.subscriptions[productId] = duynguyenx;
  } else {
    obj.subscriber.subscriptions["com.duynguyenx.premium.yearly"] = duynguyenx;
  }
  obj.subscriber.entitlements[entitlement] = duynguyenx;
} else {
  obj.subscriber.subscriptions["com.duynguyenx.premium.yearly"] = duynguyenx;
  obj.subscriber.entitlements["pro"] = duynguyenx;
}

$done({ body: JSON.stringify(obj) });
