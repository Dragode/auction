package dragode.auction.controller.response;

public class BaseResponse {
    private String resultCode = HttpResult.SUCCESS.getResultCode();
    private String resultDesc = HttpResult.SUCCESS.getResultDesc();

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultDesc() {
        return resultDesc;
    }

    public void setResultDesc(String resultDesc) {
        this.resultDesc = resultDesc;
    }
}
