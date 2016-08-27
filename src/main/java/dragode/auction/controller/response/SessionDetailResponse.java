package dragode.auction.controller.response;

import dragode.auction.model.Goods;
import dragode.auction.model.Session;

/**
 * Created by Dracode on 2016/8/27.
 */
public class SessionDetailResponse extends BaseListResponse<Goods> {
    private Session session;

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
