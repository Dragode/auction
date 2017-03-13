package dragode.auction.controller.response;

public class BaseResponse {
    private String resultCode = HttpResult.SUCCESS.getResultCode();
    private String resultDesc = HttpResult.SUCCESS.getResultDesc();

    public BaseResponse() {
    }

    public BaseResponse(String resultCode, String resultDesc) {
        this.resultCode = resultCode;
        this.resultDesc = resultDesc;
    }

    public BaseResponse(HttpResult httpResult){
        this.resultCode = httpResult.getResultCode();
        this.resultDesc = httpResult.getResultDesc();
    }

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

    public static BaseResponse successResponse(){
        return new BaseResponse(HttpResult.SUCCESS.getResultCode(),HttpResult.SUCCESS.getResultDesc());
    }
}
