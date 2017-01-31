package dragode.auction.controller.response;

/**
 * Rest相应报文基类
 */
public class BaseRestResponse<T> extends BaseResponse {
    T item;

    public T getItem() {
        return item;
    }

    public void setItem(T item) {
        this.item = item;
    }
}
