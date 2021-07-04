package com.mycom.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mycom.model.Item;
import com.mycom.repository.ItemRespository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ItemController {

	@Autowired
	private ItemRespository itemRespository;

	private static final Logger LOGGER = LoggerFactory.getLogger(ItemController.class);

	@GetMapping(path = "/item", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Item>> getItems() {
		List<Item> items = null;
		try {
			LOGGER.debug("Invoking Item Controller get Items");

			items = StreamSupport.stream(itemRespository.findAll().spliterator(), false).collect(Collectors.toList());

			LOGGER.debug(items.toString());

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(items);

	}

	@PostMapping(path = "/item/add", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<Item> addItem(@RequestBody Item item) {

		try {
			LOGGER.debug("Invoking Item Controller add Item");
			LOGGER.debug("adding item: " + item.toString());

			Item addedItem = itemRespository.save(item);

			if (addedItem.getItemId() != null) {
				return ResponseEntity.status(HttpStatus.CREATED).body(addedItem);
			} else {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
			}

		} catch (Exception e) {

			LOGGER.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@GetMapping(path = "/item/get/{itemId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Item> getItemById(@PathVariable String itemId) {
		Item item = null;
		try {
			LOGGER.debug("Invoking Item Controller get Item by Id " + itemId);

			item = itemRespository.findByitemId(Long.valueOf(itemId).longValue());

			LOGGER.debug(item.toString());

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(item);

	}
	
	@PostMapping(path = "/item/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Item> deleteItem(@RequestBody Item item) {
		try {
			LOGGER.debug("Invoking Item Controller delete Item " + item.toString());

			itemRespository.delete(item);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);

	}
}
