package dragode.auction.controller.response;

import java.util.List;

public class BaseListResponse<T> extends BaseResponse {
    private List<T> items;

    public List<T> getItems() {
        return items;
    }

    public void setItems(List<T> items) {
        this.items = items;
    }
}
