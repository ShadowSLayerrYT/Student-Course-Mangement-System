import java.sql.*;
class DBCRUD{
	public static void main(String args[])throws Exception{
		Class.forName("oracle.jdbc.driver.OracleDriver");
		Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","system","admin");
		if( con != null )
			System.out.println("connected");
		else
			System.out.println("not connected");

		Statement stmt = con.createStatement();
                // String s1="INSERT into product values(118,'pen drive',97.98)";
	//String s1 = "DELETE FROM PRODUCT WHERE PID= 115";
                  String s1 = "UPDATE product SET PCOST = 48.90 WHERE PID=110";
                
                int n = stmt.executeUpdate(s1);
		System.out.println("Records effected:" + n);
                    con.commit();
               
		
                ResultSet rs=stmt.executeQuery("select  * from product");
                while(rs.next())
                 {
                           System.out.println(rs.getInt(1)+"   "+rs.getString(2)+"  "+rs.getDouble(3));
                    //  System.out.println(rs.getInt("PID")+"   "+rs.getString("PNAME")+"  "+rs.getDouble("PCOST"));
                 }
                con.close();
                stmt.close();

	}
}