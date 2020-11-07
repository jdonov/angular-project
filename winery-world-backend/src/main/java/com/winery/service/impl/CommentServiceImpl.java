package com.winery.service.impl;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.CommentBindingDTO;
import com.winery.model.binding.CommentReplyBindingDTO;
import com.winery.model.entity.Comment;
import com.winery.model.entity.User;
import com.winery.model.entity.Winery;
import com.winery.model.service.CommentReplyServiceDTO;
import com.winery.model.service.CommentServiceDTO;
import com.winery.repository.CommentRepository;
import com.winery.service.CommentService;
import com.winery.service.UserService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final WineryService wineryService;

    public CommentServiceImpl(CommentRepository commentRepository, ModelMapper modelMapper, UserService userService, WineryService wineryService) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.wineryService = wineryService;
    }

    @Override
    public CommentServiceDTO placeComment(CommentBindingDTO commentBindingDTO) {
        //        User user = this.userService.getLoggedInUser(); //TODO UNCOMMENT TO GET LOGGED IN USER
        User user = this.userService.getUser("test@test.com");
        Winery winery = this.wineryService.getWineryById(commentBindingDTO.getWineryId());
        Comment comment = this.modelMapper.map(commentBindingDTO, Comment.class);
        comment.setUser(user);
        comment.setWinery(winery);
        comment = this.commentRepository.saveAndFlush(comment);
//        comment.setParent(comment);
//        comment = this.commentRepository.saveAndFlush(comment);
        return this.modelMapper.map(comment, CommentServiceDTO.class);
    }

    @Override
    public CommentReplyServiceDTO placeReply(CommentReplyBindingDTO commentReplyBindingDTO) {
        //        User user = this.userService.getLoggedInUser(); //TODO UNCOMMENT TO GET LOGGED IN USER
        User user = this.userService.getUser("test@test.com");
        Winery winery = this.wineryService.getWineryById(commentReplyBindingDTO.getReply().getWineryId());
        Comment comment = this.modelMapper.map(commentReplyBindingDTO.getReply(), Comment.class);
        comment.setUser(user);
        comment.setWinery(winery);
        Comment parent = this.commentRepository.findById(commentReplyBindingDTO.getParentId()).orElse(null);
        comment.setParent(parent);
        comment = this.commentRepository.saveAndFlush(comment);
        if (parent.getReplies() == null) {
            parent.setReplies(new HashSet<>());
        }
        parent.getReplies().add(comment);
        this.commentRepository.saveAndFlush(parent);
        return this.modelMapper.map(comment, CommentReplyServiceDTO.class);
    }

    @Override
    public List<CommentServiceDTO> getCommentsForWinery(String wineryId) {
        List<Comment> comments = this.commentRepository.findAllByWineryIdAndParentIdOrderByCommentDateTimeAsc(wineryId, null);
        return comments.stream()
                .map(c -> this.modelMapper.map(c, CommentServiceDTO.class))
                .collect(Collectors.toList());
    }
}
