package dragode.auction.controller.response;

public enum HttpResult {
    SUCCESS("0", "success"),

    BID_MAX_PRICE_LESS_THEN_GOODS_CURRENT_PRICE("1001", "代理最高价格比当前商品价格低！"),
    ;

    private String resultCode;
    private String resultDesc;

    public String getResultCode() {
        return resultCode;
    }

    public String getResultDesc() {
        return resultDesc;
    }

    HttpResult(String resultCode, String resultDesc) {
        this.resultCode = resultCode;
        this.resultDesc = resultDesc;
    }
}
