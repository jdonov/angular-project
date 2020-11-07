package com.winery.web;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.CommentBindingDTO;
import com.winery.model.binding.CommentReplyBindingDTO;
import com.winery.model.service.CommentReplyServiceDTO;
import com.winery.model.service.CommentServiceDTO;
import com.winery.model.service.WineServiceDTO;
import com.winery.service.CommentService;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/register")
    public ResponseEntity<CommentServiceDTO> registerComment(@Valid @RequestBody CommentBindingDTO commentBindingDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        } else {
            CommentServiceDTO commentServiceDTO = this.commentService.placeComment(commentBindingDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(commentServiceDTO);
        }
    }
    @PostMapping("/reply")
    public ResponseEntity<CommentReplyServiceDTO> replyToComment(@Valid @RequestBody CommentReplyBindingDTO commentBindingDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        } else {
            CommentReplyServiceDTO commentServiceDTO = this.commentService.placeReply(commentBindingDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(commentServiceDTO);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CommentServiceDTO>> getCommentsForWinery(@PathVariable("id") String wineryId) {
        List<CommentServiceDTO> comments = this.commentService.getCommentsForWinery(wineryId);
        return ResponseEntity.ok(comments);
    }
}
