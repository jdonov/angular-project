package com.winery.model.binding;

import javax.validation.constraints.NotEmpty;

public class CommentBindingDTO {

    private String comment;
    private String wineryId;

    public CommentBindingDTO() {
    }

    @NotEmpty(message = "Comment can not be empty!")
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @NotEmpty(message = "Winery ID can not be empty!")
    public String getWineryId() {
        return wineryId;
    }

    public void setWineryId(String wineryId) {
        this.wineryId = wineryId;
    }
}
