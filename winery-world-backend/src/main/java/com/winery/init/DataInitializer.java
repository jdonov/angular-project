package com.winery.init;

import com.winery.model.binding.*;
import com.winery.model.entity.Rating;
import com.winery.model.service.CommentServiceDTO;
import com.winery.model.service.UserServiceDTO;
import com.winery.model.service.WineServiceDTO;
import com.winery.model.service.WineryServiceDTO;
import com.winery.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserService userService;
    private final WineryService wineryService;
    private final WineService wineService;
    private final CommentService commentService;
    private final OrderService orderService;

    public DataInitializer(UserService userService, WineryService wineryService, WineService wineService, CommentService commentService, OrderService orderService) {
        this.userService = userService;
        this.wineryService = wineryService;
        this.wineService = wineService;
        this.commentService = commentService;
        this.orderService = orderService;
    }

    @Override
    public void run(String... args) throws Exception {

        if(this.userService.getCountOfAllUsers() == 0) {

            List<UserServiceDTO> users = List.of(
                    new UserRegisterDTO("test@test.com", "123", "123"),
                    new UserRegisterDTO("test2@test.com", "123", "123")
            ).stream().map(this.userService::registerUser).collect(Collectors.toList());

            List<WineryServiceDTO> wineries = List.of(
                    new WineryRegisterBindingDTO(
                            "The Golden Grape Winery",
                            new AddressWineryBindingDTO("SOUTH_WESTERN", "Petrich", "Boris 1A"),
                            "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
                            "https://images.unsplash.com/photo-1593535388526-a6b8556c5351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"),
                    new WineryRegisterBindingDTO(
                            "Cheers Vineyard",
                            new AddressWineryBindingDTO("NORTH_WESTERN", "Vraca", "Dondukov 15D"),
                            "This card has supporting text below as a natural lead-in to additional content.",
                            "https://images.unsplash.com/photo-1558241665-89718b74c89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")
            ).stream().map(w -> this.wineryService.registerWineryInit(w, users.get(0).getUsername())).collect(Collectors.toList());
            wineries.addAll(List.of(
                    new WineryRegisterBindingDTO(
                            "Farmtown Vineyards",
                            new AddressWineryBindingDTO("SOUTH_WESTERN", "Blagoevgrad", "Vihren 2C"),
                            "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
                            "https://images.unsplash.com/photo-1562497261-397e5f16eeb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"),
                    new WineryRegisterBindingDTO(
                            "Castle Rock Winery",
                            new AddressWineryBindingDTO("SOUTH_WESTERN", "Blagoevgrad", "Vihren 2C"),
                            "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
                            "https://images.unsplash.com/photo-1558138818-d44c4dea7a6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"),
                    new WineryRegisterBindingDTO(
                            "Mountain Top Vineyard",
                            new AddressWineryBindingDTO("NORTH_WESTERN", "Vidin", "Dondukov 15D"),
                            "This card has supporting text below as a natural lead-in to additional content.",
                            "https://images.unsplash.com/photo-1572913017567-02f0649bc4fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8d2luZXJ5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")
            ).stream().map(w -> this.wineryService.registerWineryInit(w, users.get(1).getUsername())).collect(Collectors.toList()));
            List<WineServiceDTO> wines = List.of(
                    new WineRegisterDTO(
                            "Mavrud",
                            new BigDecimal("74.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1546944517-4f38480ff03c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            wineries.get(4).getId()
                    ),
                    new WineRegisterDTO(
                            "Roze",
                            new BigDecimal("54.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1588406590000-6e285b62c833?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            wineries.get(1).getId()
                    ),
                    new WineRegisterDTO(
                            "Merlo",
                            new BigDecimal("149.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                            wineries.get(0).getId()
                    ),
                    new WineRegisterDTO(
                            "Syrah",
                            new BigDecimal("144.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1544776527-68e63addedf7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                            wineries.get(1).getId()
                    ),
                    new WineRegisterDTO(
                            "Syrah",
                            new BigDecimal("144.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8d2luZSUyMGJvdHRsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                            wineries.get(2).getId()
                    ),
                    new WineRegisterDTO(
                            "Sauvignon Blanc",
                            new BigDecimal("79.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1557682204-e53b55fd750c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbmUlMjBib3R0bGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                            wineries.get(3).getId()
                    ),
                    new WineRegisterDTO(
                            "Blandys",
                            new BigDecimal("69.99"),
                            "The best wine",
                            "https://images.unsplash.com/photo-1598915850233-e1e178c0e2c3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdpbmUlMjBib3R0bGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                            wineries.get(4).getId()
                    )
            ).stream().map(this.wineService::addNewWine).collect(Collectors.toList());

            this.wineService.rateWineInit(wines.get(0).getId(), Rating.GOOD, "test@test.com");
            this.wineService.rateWineInit(wines.get(1).getId(), Rating.EXCELLENT, "test@test.com");
            this.wineService.rateWineInit(wines.get(2).getId(), Rating.OK, "test2@test.com");
            this.wineService.rateWineInit(wines.get(0).getId(), Rating.EXCELLENT, "test2@test.com");

            List<CommentServiceDTO> comments = List.of(
                    new CommentBindingDTO("Excellent winery", wineries.get(0).getId()),
                    new CommentBindingDTO("We strongly recommend it!", wineries.get(0).getId())
            ).stream().map(c -> this.commentService.placeCommentInit(c, "test@test.com")).collect(Collectors.toList());
            List.of(
                    new CommentReplyBindingDTO(comments.get(0).getId(), new CommentBindingDTO("We agree it is nice winery", wineries.get(0).getId())),
                    new CommentReplyBindingDTO(comments.get(0).getId(), new CommentBindingDTO("Yes indeed, very nice winery", wineries.get(0).getId())),
                    new CommentReplyBindingDTO(comments.get(1).getId(), new CommentBindingDTO("Yes indeed, very nice winery", wineries.get(0).getId()))
            ).forEach(r -> this.commentService.placeReplyInit(r, "test2@test.com"));
        }
    }
}
