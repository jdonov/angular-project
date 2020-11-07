package com.winery.config;


import com.winery.model.binding.CommentReplyBindingDTO;
import com.winery.model.entity.Comment;
import com.winery.model.service.CommentReplyServiceDTO;
import com.winery.model.service.CommentServiceDTO;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class ApplicationBeanConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder();
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(Comment.class, CommentServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), CommentServiceDTO::setUsername);
        });
        modelMapper.typeMap(Comment.class, CommentReplyServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), CommentReplyServiceDTO::setUsername);
            mapper.map(src -> src.getParent().getId(), CommentReplyServiceDTO::setParentId);
        });

        return modelMapper;
    }
}
