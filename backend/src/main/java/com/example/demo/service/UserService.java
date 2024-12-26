package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.models.User;
import com.example.demo.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@Transactional

public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<UserDTO> getAllUsers(){

        List<User> userList = userRepo.findAll();
        System.out.print("user list"+userList);
        List<UserDTO> result = modelMapper.map(userList, new TypeToken<List<UserDTO>>(){}.getType());
        return result;

    }

    public UserDTO saveUser(UserDTO userDTO){
        userRepo.save(modelMapper.map(userDTO,User.class));
        return userDTO;
    }

    public UserDTO getUserById(Integer userId){
        User user = userRepo.getUserById(userId);
        return modelMapper.map(user,UserDTO.class);
    }

    public UserDTO updateUser(UserDTO userDTO){
        userRepo.save(modelMapper.map(userDTO,User.class));
        return userDTO;
    }


    public String deleteUser(UserDTO userDTO){
        userRepo.delete(modelMapper.map(userDTO ,User.class));
        return "user deleted";
    }
    public String deleteUserwithID(Integer userId){
        userRepo.deleteById(userId);
        return "user deleted";
    }

}
