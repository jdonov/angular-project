package com.winery.config;


import com.winery.model.entity.*;
import com.winery.model.service.*;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
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
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        
        Converter<List<WineRate>, Rating> ratingConverter = mappingContext -> {
            if (mappingContext.getSource() == null) {
                return Rating.values()[0];
            } else {
                return Rating.values()[
                        (int) Math.ceil(mappingContext.getSource().stream()
                                .map(WineRate::getRate)
                                .mapToInt(Enum::ordinal)
                                .average().orElse(0))
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


        modelMapper.typeMap(Winery.class, WineryDetailsServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), WineryDetailsServiceDTO::setOwner);
        });
        modelMapper.typeMap(Winery.class, WineryServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUser().getUsername(), WineryServiceDTO::setOwner);
        });

        modelMapper.typeMap(OrderedWines.class, OrderWineServiceDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getWine().getName(), OrderWineServiceDTO::setName);
        });

        return modelMapper;
    }
}
