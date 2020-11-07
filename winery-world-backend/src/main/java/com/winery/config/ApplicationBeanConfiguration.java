package com.winery.config;


import com.winery.model.entity.Comment;
import com.winery.model.entity.Rating;
import com.winery.model.entity.Wine;
import com.winery.model.service.CommentReplyServiceDTO;
import com.winery.model.service.CommentServiceDTO;
import com.winery.model.service.WineServiceDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;


@Configuration
public class ApplicationBeanConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder();
    }

    @Bean
    @SuppressWarnings("depricated")
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        
        Converter<List<Rating>, Rating> ratingConverter = mappingContext -> {
            if (mappingContext.getSource() == null) {
                return Rating.values()[0];
            } else {
                return Rating.values()[
                        (int) Math.ceil(mappingContext.getSource().stream().mapToInt(Enum::ordinal).average().orElse(0))
                        ];
            }
        };
        modelMapper.typeMap(Comment.class, CommentServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), CommentServiceDTO::setUsername);
        });
        modelMapper.typeMap(Comment.class, CommentReplyServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), CommentReplyServiceDTO::setUsername);
            mapper.map(src -> src.getParent().getId(), CommentReplyServiceDTO::setParentId);
        });
        modelMapper.typeMap(Wine.class, WineServiceDTO.class).addMappings(mapper -> {
            mapper.using(ratingConverter).map(Wine::getRatings, WineServiceDTO::setRating);
        });

        return modelMapper;
    }
}
