package com.winery.service;

import com.winery.model.service.CommentServiceDTO;

import java.util.List;

public interface CommentServiceBase {
    List<CommentServiceDTO> getCommentsForWinery(String wineryId);
}
