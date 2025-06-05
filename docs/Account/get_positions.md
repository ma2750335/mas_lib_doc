### function 名稱

`get_positions`

---

### function 用途

查詢目前持倉部位。

---

### function 參數

| 參數名稱 | 型別 | 備註說明 |
|----------|------|----------|
| params   | dict | symbol（str）：若有指定則僅查詢該商品的部位，否則回傳所有商品的未平倉部位 |

---

### function 回傳內容

| 名稱   | 型別 | 備註說明                                  |
|--------|------|-------------------------------------------|
| return | list | 回傳所有符合條件的未平倉部位資料，每筆為 dict 結構，內容依 MT5 API 而定 |

回傳格式如下：
```python
[
    {
        "ticket": 123456789,
        "symbol": "EURUSD",
        "type": 0,
        "volume": 1.0,
        "price_open": 1.1000,
        "price_current": 1.1050,
        "profit": 50.0,
        "time": datetime(2024, 1, 1, 10, 0, 0)
    }
]
```

---

### 💡 範例程式碼

```python
# 查詢全部未平倉部位
positions = engine.get_positions({})

# 查詢特定商品部位
positions_usdjpy = engine.get_positions({"symbol": "USDJPY"})

for pos in positions_usdjpy:
    print(f"商品：{pos['symbol']}，數量：{pos['volume']}，價格：{pos['price_open']}")

```

---

### MT5 function

function 名稱：`mt5.positions_get(symbol=None)`
function 用途：查詢目前帳戶中的所有未平倉部位（Position），可指定商品代碼篩選。

以下為所有可傳入的命名參數（皆為可選）：
| 參數名稱 | 型別 | 說明 |
|----------|------|------|
| symbol   | str  | 商品代碼。若指定此欄位，將回傳該商品的所有未平倉部位。指定 symbol 時會忽略 ticket。 |
| group    | str  | 商品群組過濾條件。可回傳符合群組條件的商品部位（例如 `"USD*"` 表示所有美元商品）。 |
| ticket   | int  | 指定部位的 ticket 編號，將回傳對應的單一持倉。此參數會被 symbol 覆蓋（symbol 優先）。 |

回傳內容:
| 型別 | 說明                         |
|------|------------------------------|
| `Position` 結構物件 | 欄位內容整合自`ENUM_POSITION_PROPERTY_INTEGER` , `ENUM_POSITION_PROPERTY_DOUBLE` ,  `ENUM_POSITION_PROPERTY_STRING` |

ENUM_POSITION_PROPERTY_INTEGER:

| 欄位名稱            | 類型     | 說明                                                           |
|---------------------|----------|----------------------------------------------------------------|
| POSITION_TICKET     | int      | 持倉編號。每筆新開的部位會分配一個唯一的 ticket。             |
| POSITION_TIME       | datetime | 持倉開倉時間。                                                 |
| POSITION_TIME_MSC   | int      | 持倉開倉時間（毫秒）。                                         |
| POSITION_TIME_UPDATE| datetime | 持倉最後變動時間。                                             |
| POSITION_TIME_UPDATE_MSC | int  | 持倉最後變動時間（毫秒）。                                     |
| POSITION_TYPE       | int      | 持倉方向（0=buy, 1=sell）。                                    |
| POSITION_MAGIC      | int      | Magic number，用於識別策略。                                   |
| POSITION_IDENTIFIER | int      | 持倉識別碼。每次重新開倉時會分配一個唯一的識別碼。             |
| POSITION_REASON     | int      | 開倉原因（0=客戶手動，1=移動端，2=網頁端，3=EA）。             |

ENUM_POSITION_PROPERTY_DOUBLE:
| 欄位名稱           | 類型  | 說明                     |
|--------------------|-------|--------------------------|
| POSITION_VOLUME    | float | 持倉數量（手數）。       |
| POSITION_PRICE_OPEN| float | 開倉價格。               |
| POSITION_SL        | float | 止損價格。               |
| POSITION_TP        | float | 止盈價格。               |
| POSITION_PRICE_CURRENT | float | 當前價格。           |
| POSITION_SWAP      | float | 累計掉期。               |
| POSITION_PROFIT    | float | 當前盈虧。               |

ENUM_POSITION_PROPERTY_STRING:
| 欄位名稱           | 類型  | 說明                     |
|--------------------|-------|--------------------------|
| POSITION_SYMBOL    | str   | 商品代碼。               |
| POSITION_COMMENT   | str   | 持倉註解。               |
| POSITION_EXTERNAL_ID | str | 外部交易系統的持倉識別碼。|


官方參考連結：

https://www.mql5.com/en/docs/python_metatrader5/mt5positionsget_py
https://www.mql5.com/en/docs/constants/tradingconstants/positionproperties