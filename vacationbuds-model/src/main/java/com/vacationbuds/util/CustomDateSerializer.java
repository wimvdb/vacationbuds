package com.vacationbuds.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;


public class CustomDateSerializer extends JsonSerializer<Date> {

	

	@Override
	public void serialize(Date value, JsonGenerator jgen,
			SerializerProvider provider) throws IOException,
			JsonGenerationException {
		SimpleDateFormat formatter = new SimpleDateFormat(
				"dd-MM-yyyy");
		String format = formatter.format(value);
		jgen.writeString(format);
	}

}
