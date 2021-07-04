/**
 * 
 */
package com.mycom.repository;

import org.springframework.data.repository.CrudRepository;

import com.mycom.model.Item;

/**
 * @author anavulla
 *
 */
public interface ItemRespository extends CrudRepository<Item, Integer> {
	Item findByitemId(Long itemId);

}
