package com.store.backend.DTO;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCart {

    private int lineId;
    private int quantity;
}
