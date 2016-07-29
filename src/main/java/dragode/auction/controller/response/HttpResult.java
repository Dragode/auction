package dragode.auction.controller.response;

public enum HttpResult {
    SUCCESS("0", "success"),
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
