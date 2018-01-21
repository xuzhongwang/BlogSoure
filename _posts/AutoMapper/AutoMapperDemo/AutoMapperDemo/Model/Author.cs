﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AutoMapperDemoTest.Model
{
    public class Author
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ContactInfo ContactInfo { get; set; }
    }
}
