package com.winery.service;

import com.winery.model.binding.CommentBindingDTO;
import com.winery.model.binding.CommentReplyBindingDTO;
import com.winery.model.service.CommentReplyServiceDTO;
import com.winery.model.service.CommentServiceDTO;

import java.util.List;

public interface CommentService{
    CommentServiceDTO placeComment(CommentBindingDTO commentBindingDTO);

    CommentServiceDTO placeCommentInit(CommentBindingDTO commentBindingDTO, String username);

    CommentReplyServiceDTO placeReply(CommentReplyBindingDTO commentReplyBindingDTO);

    CommentReplyServiceDTO placeReplyInit(CommentReplyBindingDTO commentReplyBindingDTO, String username);

    List<CommentServiceDTO> getCommentsForWinery(String wineryId);
}
