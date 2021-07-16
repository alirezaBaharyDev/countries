export class PatternConstants {
  public static FaAndEnText = '^[a-zA-z آ-ی]*';
  public static email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  public static phone = '(([0]+[9])([0-9]{9})||([۰]+[۹])([۰-۹]{9}))$';
  public static tell = '(([0])([0-9]{10})||([۰])([۰-۹]{10}))$';
  public static nationalCode = '(([0-9]{10})||([۰-۹]{10}))$';
  public static faText = '[آ-ی ]+';
  public static enText = '[ a-zA-Z0-9]+';
  public static date = '^(([0-9]{1})([.,\/]([0-9]{1,2})){0,1}|([۰-۹]{1})([.,\/]([۰-۹]{1,2})){0,1})';
  public static streetName = '[۰-۹-0-9آ-ی ]+';
  public static bankCard = '((([1-9])([0-9]{18})||([۱-۹])([۰-۹]{18}))||(([1-9])([0-9]{15})||([۱-۹])([۰-۹]{15})))$';
  public static bcNumber = '[1-9]{1}|[1-9][0-9]{2}|[۱-۹]{1}|[۱-۹][۰-۹]{2}]'; // شماره شناسنامه
  public static password = '^[A-Za-z0-9_!@#$&*()%]{8,30}$';
  public static number = '[0-9]|[۰-۹]';
  public static faNumberAndText = '[۰-۹]*|[آ-ی ]*';
  public static userName = '^([a-zA-z 0-9_]{4,})$';
  public static postalCode = '((([1-9]{1})([0-9]{9}))||(([۱-۹]{1})([۰-۹]{9})))$';
}
