const priceTable = {
  SHAKER: { name: "Bình lắc", price: 120000 },
  GLOVES: { name: "Găng tay", price: 180000 },
  STRAP: { name: "Dây kéo lưng", price: 150000 },
};

function validateAndParseOrder(rawCode) {
  if (!rawCode) return null;

  const cleanCode = rawCode.trim().toUpperCase();

  if (cleanCode.length < 8 || !cleanCode.startsWith("GYM-")) {
    return null;
  }

  const parts = cleanCode.split("-");
  if (parts.length < 3) return null;

  const productCode = parts[1];
  const quantity = parseInt(parts[2], 10);
  const isVIP = parts.includes("VIP");

  if (!priceTable[productCode] || isNaN(quantity) || quantity <= 0) {
    return null;
  }

  return {
    code: cleanCode,
    productCode: productCode,
    productName: priceTable[productCode].name,
    unitPrice: priceTable[productCode].price,
    quantity: quantity,
    isVIP: isVIP,
  };
}

function printReceipt(order) {
  const border = "-".repeat(42);
  const subtotal = order.unitPrice * order.quantity;
  const discount = order.isVIP ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  console.log(border);
  console.log(
    "|" + "HÓA ĐƠN BÁN LẺ PHỤ KIỆN GYM".padStart(32).padEnd(40) + "|",
  );
  console.log(border);
  console.log(`| Mã đơn hàng : ${order.code.padEnd(25)}|`);
  console.log(`| Sản phẩm   : ${order.productName.padEnd(25)}|`);
  console.log(`| Số lượng   : ${order.quantity.toString().padEnd(25)}|`);
  console.log(
    `| Đơn giá    : ${(order.unitPrice.toLocaleString() + " VNĐ").padEnd(25)}|`,
  );
  console.log(
    `| Thành tiền : ${(subtotal.toLocaleString() + " VNĐ").padEnd(25)}|`,
  );
  console.log(
    `| Giảm VIP   : ${(discount.toLocaleString() + " VNĐ").padEnd(25)}|`,
  );
  console.log(border);
  console.log(
    `| TỔNG TIỀN  : ${(total.toLocaleString() + " VNĐ").padEnd(25)}|`,
  );
  console.log(border + "\n");
}

function runSimulator(simulatedInputs) {
  let currentOrder = null;
  let inputIndex = 0;
  let choice = 0;

  do {
    if (inputIndex >= simulatedInputs.length) break;

    choice = simulatedInputs[inputIndex++];
    console.log(`\n--- MENU ĐIỀU KHIỂN ---`);
    console.log(`1. Nhập và chuẩn hóa mã đơn hàng`);
    console.log(`2. Tính tiền và in hóa đơn phụ kiện`);
    console.log(`3. Thoát chương trình`);
    console.log(`>> Lựa chọn của bạn: ${choice}`);

    switch (choice) {
      case 1: {
        const rawCode = simulatedInputs[inputIndex++];
        console.log(`>> Nhập mã đơn hàng: "${rawCode}"`);
        const parsed = validateAndParseOrder(rawCode);
        if (parsed) {
          currentOrder = parsed;
          console.log(`=> Mã đơn hàng hợp lệ: ${parsed.code}`);
        } else {
          currentOrder = null;
          console.log(
            `=> LỖI: Mã đơn hàng không hợp lệ! (Độ dài >= 8, tiền tố GYM-, đúng định dạng GYM-SP-SL)`,
          );
        }
        break;
      }
      case 2: {
        if (!currentOrder) {
          console.log(
            `=> LỖI: Chưa có đơn hàng hợp lệ. Vui lòng chọn 1 để nhập mã đơn trước!`,
          );
        } else {
          printReceipt(currentOrder);
        }
        break;
      }
      case 3: {
        console.log(`=> Cảm ơn bạn đã sử dụng dịch vụ. Tạm biệt!`);
        break;
      }
      default: {
        console.log(`=> Lựa chọn không hợp lệ. Vui lòng chọn từ 1 đến 3!`);
        break;
      }
    }
  } while (choice !== 3);
}

const testScenario = [1, "   gym-shaker-02-vip   ", 2, 1, "GYM-INVALID", 2, 3];

runSimulator(testScenario);
