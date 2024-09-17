package com.store.backend.DTO;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddToCart {
    Integer cartId;
    Integer productId;
    Integer qty;
    String size;
}
