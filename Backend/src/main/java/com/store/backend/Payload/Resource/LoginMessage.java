package com.store.backend.Payload.Resource;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginMessage {
    String message;
    boolean status;
}
