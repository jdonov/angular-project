package com.winery.service.impl;

import com.winery.model.entity.Comment;
import com.winery.model.service.CommentServiceDTO;
import com.winery.repository.CommentRepository;
import com.winery.service.CommentServiceBase;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceBaseImpl implements CommentServiceBase {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    public CommentServiceBaseImpl(CommentRepository commentRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CommentServiceDTO> getCommentsForWinery(String wineryId) {
        List<Comment> comments = this.commentRepository.findAllByWineryIdAndParentIdOrderByCommentDateTimeAsc(wineryId, null);
        return comments.stream()
                .map(c -> this.modelMapper.map(c, CommentServiceDTO.class))
                .collect(Collectors.toList());
    }
}
