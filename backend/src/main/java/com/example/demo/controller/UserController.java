package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value="api/v1/")

public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/getUsers")
    public List<UserDTO> getUsers()
    {
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{userID}")
    public UserDTO getUserById(@PathVariable Integer userID)
    {
        return userService.getUserById(userID);
    }

    @PostMapping("/addUser")
    public UserDTO saveUser(@RequestBody UserDTO userDto){
//        System.out.println("reqeust data"+userDTO);
        return userService.saveUser(userDto);
    }

    @PutMapping("/updateUser")
    public UserDTO updateUser(@RequestBody UserDTO userDTO){
        System.out.println("Received update request: " + userDTO);
        return userService.updateUser(userDTO);
    }
    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestBody UserDTO userDTO){
        return userService.deleteUser(userDTO);
    }
    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUserWithID(@PathVariable Integer userId){
        return userService.deleteUserwithID(userId);
    }
}
