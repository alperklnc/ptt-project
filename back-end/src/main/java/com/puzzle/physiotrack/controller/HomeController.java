package com.puzzle.physiotrack.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
public class HomeController {

    @GetMapping("/home")
    @ResponseStatus(code = HttpStatus.OK, reason = "OK")
    public String ok() {
        return "Class Level HTTP Status Overridden. The HTTP Status will be OK (CODE 200)\n";
    }

    @GetMapping("/")
    @ResponseStatus(code = HttpStatus.OK, reason = "OK")
    public String ok2() {
        return "Class Level HTTP Status Overridden. The HTTP Status will be OK (CODE 200)\n";
    }

    @RequestMapping(
            value = "/process",
            method = RequestMethod.POST)
    public void process(@RequestBody Map<String, Object> payload){

        System.out.println(payload);

    }
}
